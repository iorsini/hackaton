import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Task from '@/models/Task';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const userId = await verifyToken(request);
    if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    
    await connectDB();
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const userId = await verifyToken(request);
    if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    
    const { text } = await request.json();
    await connectDB();
    
    const task = await Task.create({ userId, text, completed: false });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}