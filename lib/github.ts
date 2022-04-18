const { NEXT_PUBLIC_GITHUB_TOKEN: github_token } = process.env;

const GITHUB_ENDPOINT = `https://api.github.com/graphql`;

export const getYearlyContributions = async (year: number) => {
  const response = await fetch(GITHUB_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${github_token}` },
    body: JSON.stringify({
      query: `query {
          user(login: "dragidavid") {
            contributionsCollection(from: "${year}-01-01T00:00:00.000Z", to: "${year}-12-31T00:00:00.000Z") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
    }),
  });

  const data = await response.json();

  data.data.user.contributionsCollection.year = year;

  return data;
};

export const getStats = async () => {
  const response = await fetch(GITHUB_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${github_token}` },
    body: JSON.stringify({
      query: `query {
          user(login: "dragidavid") {
            createdAt
            contributionsCollection {
              contributionYears
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
    }),
  });

  return response.json();
};
