import { NextResponse } from 'next/server';

// ─── Configuration JSONBin ───────────────────────────────────────────────────
// JSONBin.io : base de données persistante en ligne (gratuit)
// Remplis ces valeurs dans les variables d'environnement Vercel
const JSONBIN_URL = process.env.JSONBIN_URL as string;       // ex: https://api.jsonbin.io/v3/b/VOTRE_BIN_ID
const JSONBIN_KEY = process.env.JSONBIN_KEY as string;       // ta Master Key JSONBin

// ─── GET : Lire toutes les réponses ─────────────────────────────────────────
export async function GET() {
  try {
    if (!JSONBIN_URL || !JSONBIN_KEY) {
      return NextResponse.json({ success: false, error: 'Config manquante' }, { status: 500 });
    }

    const res = await fetch(`${JSONBIN_URL}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_KEY,
        'X-Bin-Meta': 'false',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'Erreur lecture' }, { status: 500 });
    }

    const data = await res.json();
    // JSONBin retourne directement le contenu du bin
    const answers = Array.isArray(data) ? data : [];
    return NextResponse.json({ success: true, data: answers });
  } catch (error) {
    console.error('GET /api/answers error:', error);
    return NextResponse.json({ success: false, error: 'Erreur lecture' }, { status: 500 });
  }
}

// ─── POST : Sauvegarder les réponses de Soulmate ────────────────────────────
export async function POST(request: Request) {
  try {
    if (!JSONBIN_URL || !JSONBIN_KEY) {
      return NextResponse.json({ success: false, error: 'Config manquante' }, { status: 500 });
    }

    const body = await request.json();

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

    // 2. Préparer la nouvelle entrée
    const newEntry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      userName: body.userName || 'Soulmate',
      answers: body.answers || {},
      ticketUnlocked: true,
    };

    // 3. Ajouter en tête de liste
    const updatedList = [newEntry, ...currentList];

    // 4. Écrire dans JSONBin
    const writeRes = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY,
      },
      body: JSON.stringify(updatedList),
    });

    if (!writeRes.ok) {
      return NextResponse.json({ success: false, error: 'Erreur sauvegarde' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Réponses enregistrées avec succès ! 💖' });
  } catch (error) {
    console.error('POST /api/answers error:', error);
    return NextResponse.json({ success: false, error: 'Erreur sauvegarde' }, { status: 500 });
  }
}
