import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'answers.json');

// Assure que le dossier data et le fichier existent
function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

// GET: Récupérer les réponses soumises pour que la chérie les lise
export async function GET() {
  try {
    ensureDataFile();
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const answers = JSON.parse(fileContent || '[]');
    return NextResponse.json({ success: true, data: answers });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lecture' }, { status: 500 });
  }
}

// POST: Sauvegarder les réponses de son homme
export async function POST(request: Request) {
  try {
    ensureDataFile();
    const body = await request.json();
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const currentList = JSON.parse(fileContent || '[]');

    const newEntry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      userName: body.userName || 'Soulmate',
      answers: body.answers || {},
      ticketUnlocked: true,
    };

    // On ajoute la nouvelle soumission en tête de liste
    currentList.unshift(newEntry);
    fs.writeFileSync(dataFilePath, JSON.stringify(currentList, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Réponses enregistrées avec succès !' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur sauvegarde' }, { status: 500 });
  }
}
