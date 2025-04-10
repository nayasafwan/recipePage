import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';


export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser (needed for file uploads)
  },
};

export async function POST(request: Request) {

  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create unique filename



    const ext = path.extname(file.name);
    
    const filename = `${uuidv4()}${ext}`;
  
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'recipes');
    
    // Ensure directory exists
    await writeFile(path.join(uploadDir, filename), buffer);


    
    return NextResponse.json({
      success: true,
      imageName : filename,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}