import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed Supliers
  const supliers: Promise<any>[] = [];
  for (let i = 1; i <= 20; i++) {
    supliers.push(
      prisma.suplier.create({
        data: {
          name: `Suplier ${i}`,
          email: `suplier${i}@example.com`,
        },
      })
    );
  }
  await Promise.all(supliers);

  // Seed Categories
  const categories: Promise<any>[] = [];
  for (let i = 1; i <= 20; i++) {
    categories.push(
      prisma.category.create({
        data: {
          name: `Category ${i}`,
        },
      })
    );
  }
  await Promise.all(categories);

  // Ambil data relasi
  const allSupliers = await prisma.suplier.findMany();
  const allCategories = await prisma.category.findMany();

  // Seed Medicines
  const medicines: Promise<any>[] = [];
  for (let i = 1; i <= 20; i++) {
    const randomSuplier =
      allSupliers[Math.floor(Math.random() * allSupliers.length)];
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];

    medicines.push(
      prisma.medicine.create({
        data: {
          name: `Medicine ${i}`,
          description: `Description for medicine ${i}`,
          price: Math.floor(Math.random() * 100000) + 1000,
          suplierId: randomSuplier.id,
          categoryId: randomCategory.id,
        },
      })
    );
  }
  await Promise.all(medicines);

  console.log("✅ Seeding selesai: 20 suplier, 20 kategori, 20 obat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
