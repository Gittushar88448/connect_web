import "server-only";

import dbConnect from "@/lib/dbConnect";
import { ModuleModel } from "@/model/Modules";
import { ModuleFormValues } from "@/lib/validations/moduleValidations";

export interface ModuleRecord extends ModuleFormValues {
  id: string;
  createdAt: string;
  updatedAt: string;
}

function serialize(doc: Record<string, unknown>): ModuleRecord {
  return {
    id: String(doc._id),
    name: doc.name as string,
    slug: doc.slug as string,
    tagline: doc.tagline as string,
    description: doc.description as string,
    icon: doc.icon as ModuleFormValues["icon"],
    tag: doc.tag as string,
    color: doc.color as ModuleFormValues["color"],
    features: doc.features as string[],
    isActive: doc.isActive as boolean,
    order: doc.order as number,
    createdAt: new Date(doc.createdAt as string).toISOString(),
    updatedAt: new Date(doc.updatedAt as string).toISOString(),
  };
}


export async function listModules(options?: { activeOnly?: boolean }): Promise<ModuleRecord[]> {
  try {
    await dbConnect();
    const filter = options?.activeOnly ? { isActive: true } : {};
    const docs = await ModuleModel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    return docs.map((d) => serialize(d as Record<string, unknown>));
  } catch (err) {
    console.warn("[services/modules] listModules failed:", (err as Error).message);
    return [];
  }
}

export async function getModuleById(id: string): Promise<ModuleRecord | null> {
  try {
    await dbConnect();
    const doc = await ModuleModel.findById(id).lean();
    return doc ? serialize(doc as Record<string, unknown>) : null;
  } catch (err) {
    console.warn("[services/modules] getModuleById failed:", (err as Error).message);
    return null;
  }
}

export async function getModuleBySlug(slug: string): Promise<ModuleRecord | null> {
  try {
    await dbConnect();
    const doc = await ModuleModel.findOne({ slug }).lean();
    return doc ? serialize(doc as Record<string, unknown>) : null;
  } catch (err) {
    console.warn("[services/modules] getModuleBySlug failed:", (err as Error).message);
    return null;
  }
}

export async function createModule(data: ModuleFormValues): Promise<ModuleRecord> {
  await dbConnect();
  const existing = await ModuleModel.findOne({ slug: data.slug }).lean();
  if (existing) {
    throw new Error(`A module with slug "${data.slug}" already exists`);
  }
  const doc = await ModuleModel.create(data);
  return serialize(doc.toObject());
}

export async function updateModule(
  id: string,
  data: ModuleFormValues
): Promise<ModuleRecord | null> {
  await dbConnect();
  const existing = await ModuleModel.findOne({ slug: data.slug, _id: { $ne: id } }).lean();
  if (existing) {
    throw new Error(`A module with slug "${data.slug}" already exists`);
  }
  const doc = await ModuleModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
  return doc ? serialize(doc as Record<string, unknown>) : null;
}

export async function deleteModule(id: string): Promise<boolean> {
  await dbConnect();
  const res = await ModuleModel.findByIdAndDelete(id);
  return Boolean(res);
}

export async function countModules(): Promise<{ total: number; active: number }> {
  try {
    await dbConnect();
    const [total, active] = await Promise.all([
      ModuleModel.countDocuments({}),
      ModuleModel.countDocuments({ isActive: true }),
    ]);
    return { total, active };
  } catch (err) {
    console.warn("[services/modules] countModules failed:", (err as Error).message);
    return { total: 0, active: 0 };
  }
}
