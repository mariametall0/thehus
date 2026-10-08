import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ─── Configuration JSONBin ───────────────────────────────────────────────────
const JSONBIN_URL = process.env.JSONBIN_URL as string;
const JSONBIN_KEY = process.env.JSONBIN_KEY as string;

const dataFilePath = path.join(process.cwd(), 'data', 'answers.json');

function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

// ─── GET : Lire toutes les réponses ─────────────────────────────────────────
export async function GET() {
  try {
    if (JSONBIN_URL && JSONBIN_KEY) {
      const res = await fetch(`${JSONBIN_URL}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_KEY,
          'X-Bin-Meta': 'false',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const answers = Array.isArray(data) ? data : [];
        return NextResponse.json({ success: true, data: answers });
      }
    }

    // Fallback local si JSONBin non configuré (ex: développement local)
    ensureDataFile();
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const answers = JSON.parse(fileContent || '[]');
    return NextResponse.json({ success: true, data: answers });
  } catch (error) {
    console.error('GET /api/answers error:', error);
    return NextResponse.json({ success: false, error: 'Erreur lecture' }, { status: 500 });
  }
}

// ─── POST : Sauvegarder les réponses de Soulmate ou de sa Chérie ───────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newEntry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      userName: body.userName || 'Soulmate',
      answers: body.answers || {},
      ticketUnlocked: true,
    };

    if (JSONBIN_URL && JSONBIN_KEY) {
      // 1. Lire les données actuelles
      const readRes = await fetch(`${JSONBIN_URL}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_KEY,
          'X-Bin-Meta': 'false',
        },
        cache: 'no-store',
      });

      let currentList: unknown[] = [];
      if (readRes.ok) {
        const existing = await readRes.json();
        currentList = Array.isArray(existing) ? existing : [];
      }

      const updatedList = [newEntry, ...currentList];

      const writeRes = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_KEY,
        },
        body: JSON.stringify(updatedList),
      });

      if (writeRes.ok) {
        return NextResponse.json({ success: true, message: 'Réponses enregistrées avec succès ! 💖' });
      }
    }

    // Fallback local (sauvegarde locale si pas de JSONBin configuré)
    ensureDataFile();
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const currentList = JSON.parse(fileContent || '[]');
    currentList.unshift(newEntry);
    fs.writeFileSync(dataFilePath, JSON.stringify(currentList, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Réponses enregistrées avec succès ! 💖' });
  } catch (error) {
    console.error('POST /api/answers error:', error);
    return NextResponse.json({ success: false, error: 'Erreur sauvegarde' }, { status: 500 });
  }
}
