import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.table("provider").del();

  await knex.table("provider").insert([
    {
      id: "PROV-001",
      user_id: "USER-001",
      name: "John Silva",
      email: "john.silva@email.com",
      phone: "+94 77 123 4567",
      profession: "Electrician",
      photo_url: "/images/team/person-1.jpg",
      address: "123 Main Street",
      town: "Colombo",
      city: "Western Province",
      country: "Sri Lanka",
      verified: true,
      facebook_link: "https://facebook.com/johnsilva",
      twitter_link: "https://twitter.com/johnsilva",
      instagram_link: "https://instagram.com/johnsilva",
      rating: 4.8,
      experience: 8,
      specializations:
        "Residential wiring, Commercial electrical work, Emergency repairs",
      availability: "Monday-Friday 8AM-6PM, Saturday 8AM-2PM",
      available_days: "Mon,Tue,Wed,Thu,Fri,Sat",
      completed_jobs: 156,
      created_date: "2024-01-15T10:30:00Z",
      status: "active",
    },
  ]);
}
