import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';


// ✅ GET: Get a single blog by ID
export async function GET(req, { params }) {
    await dbConnect()

    try {
        const blog = await Blog.findById(params.id)
        if (!blog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, blog });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error
        }, { status: 500 })
    }

}

// ✅ PUT: Update blog by ID
export async function PUT(req, {params}) {
    await dbConnect()

    try {
        const body = await req.json()
        const updateBlog = await Blog.findByIdAndUpdate(params.id, body, { new: true })
        if (!updateBlog) {
            return NextResponse.json({success: false, message: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, updateBlog });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error
        }, { status: 500 })
    }
}


// ✅ DELETE: Remove blog by ID
export async function DELETE(req, {params}) {
    await dbConnect()

    try {
        const deleteBlog = await Blog.findByIdAndDelete(params.id)
        if (!deleteBlog) {
            return NextResponse.json({success: false, message: 'Blog not found' }, { status: 404 })
        }
        return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        return NextResponse.json({
            success: false, 
            error: error 
        }, { status: 500 })
    }
}
