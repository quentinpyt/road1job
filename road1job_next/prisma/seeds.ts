
import { prisma } from "../lib/prisma";
import fs from "fs";
async function main() {
  const data = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));
  const cleanedData = data.map((item: any) => {
    return {
      name: item.title,
      company: item.smallCompany.companyName,
      location: item.location,
      description: item.descriptionPreview,
      type: item.title,
      skills: item.skills,
    };
  });
  return prisma.job.createMany({
    data: cleanedData
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });