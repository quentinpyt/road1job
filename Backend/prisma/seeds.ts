import { prisma } from "../lib/prisma";
import fs from "fs";
import scrap from "../src/scraping/scraping";
async function main() {
  const data = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));
  for (const item of data) {
    await prisma.job.create({
      data: {
        name: item.title,
        company: item.smallCompany.companyName,
        descriptionmini: item.descriptionPreview,
        description: String(await scrap(item.seoAlias)),
        type: item.title,
        experience: item.requiredExperience,
        skills: {
          create: (item.skillsList ?? []).map((skill: any) => {
            console.log(skill);
            return {
              name: skill.name,
              value: skill.value,
            };
          }),
        },
        analytics: {
          create:{
            applications: item.analytics?.applications,
            applyBtnClicks: item.analytics?.applyBtnClicks,
            atsApplications: item.analytics?.atsApplications,
            cta:item.analytics?.cta,
            ctr:item.analytics?.ctr,
            remoteApplications:item.analytics?.remoteApplications,
            totalApplications:item.analytics?.totalApplications,
            updatedAt: item.analytics?.updatedAt ? new Date(item.analytics?.updatedAt) : new Date(Date.now()),
            visitsCount:item.analytics?.visitsCount
          }
        },
        geolocation: {
          create: {
            latitude: item._geoloc?.[0]?.lat ?? 0,
            longitude: item._geoloc?.[0]?.lng ?? 0,
            city: item.formattedPlaces?.[0]?.split(",")?.[0] ?? "none",
            country: item.formattedPlaces?.[0]?.split(",")?.[1] ?? "none",
          },
      },
      salary:{
        create: {
          min: item.details?.salary?.min?? 0,
          max: item.details?.salary?.max?? 0,
          currency: item.details?.salary?.currency?? "none",
      }
    }
    }})};

  //   const job = await prisma.job.findMany()
  //  for (const item of job) {

  //     if (data[item.id].skillsList && data[item.id].skillsList.length > 0 ) {
  //         for (const skill of data[item.id].skillsList) {
  //         console.log(skill);
  //       await prisma.skills.create({
  //         data: {
  //           name: skill.name,
  //           value: skill.value,
  //           jobId: item.id
  //         }
  //       });
  //     }
  //  }else {
  //     continue;
  //  }

  // }
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