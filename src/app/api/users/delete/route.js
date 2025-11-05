// app/api/users/delete/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Task from "@/models/Task";

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    await connectDB();

    // Buscar usuário
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Deletar todas as tarefas do usuário
    await Task.deleteMany({ userId: user._id });

    // Deletar o usuário
    await User.deleteOne({ _id: user._id });

    return Response.json({
      success: true,
      message: "Conta deletada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
    return Response.json(
      { error: "Erro ao deletar conta" },
      { status: 500 }
    );
  }
}