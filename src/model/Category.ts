import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Category slug is required"],
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

const CategoryModel = (mongoose.models.Category as mongoose.Model<ICategory>) ||
    mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;