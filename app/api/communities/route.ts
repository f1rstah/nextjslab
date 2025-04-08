import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Тип для сообщества
type Community = {
    id: number;
    name: string;
    description: string;
    avatar: string;
};

const dataPath = path.join(process.cwd(), 'public', 'communities.json');

// GET-запрос (получить список сообществ)
export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const communities: Community[] = JSON.parse(data);
        return NextResponse.json(communities);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch communities' },
            { status: 500 }
        );
    }
}

// POST-запрос (создать новое сообщество)
export async function POST(request: Request) {
    try {
        const newCommunity: Omit<Community, 'id'> = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        const communities: Community[] = JSON.parse(data);

        const newId = communities.length > 0
            ? Math.max(...communities.map(c => c.id)) + 1
            : 1;

        const updatedCommunities = [
            ...communities,
            { id: newId, ...newCommunity }
        ];

        await fs.writeFile(dataPath, JSON.stringify(updatedCommunities, null, 2));
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create community' },
            { status: 500 }
        );
    }
}