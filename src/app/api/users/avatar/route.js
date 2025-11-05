// src/app/api/users/avatar/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar");

    if (!file) {
      return Response.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      return Response.json({ error: "Arquivo deve ser uma imagem" }, { status: 400 });
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: "Imagem deve ter no máximo 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Gerar nome único
    const uniqueName = `${session.user.id}-${Date.now()}${path.extname(file.name)}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", "avatars");
    
    // Criar diretório se não existir
    const fs = require("fs");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, uniqueName);
    await writeFile(filePath, buffer);

    const avatarUrl = `/uploads/avatars/${uniqueName}`;

    // Atualizar no banco
    await connectDB();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { avatar: avatarUrl },
      { new: true }
    );

    if (!user) {
      return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return Response.json({
      success: true,
      avatar: avatarUrl,
    });
  } catch (error) {
    console.error("❌ Erro ao fazer upload:", error);
    return Response.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}