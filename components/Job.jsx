import Parser from "rss-parser";

const Job = async () => {
  const parser = new Parser();

  const feed = await parser.parseURL(
    "https://www.freejobalert.com/feed/"
  );

  return (
    <div>
      <h1>Latest Govt Jobs</h1>

      {feed.items.map((job, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{job.title}</h3>

          <a href={job.link} target="_blank">
            View Job
          </a>

          <p>{job.pubDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Job;