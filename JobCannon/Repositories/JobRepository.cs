using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class JobRepository : BaseRepository, IJobRepository
    {
        public JobRepository(IConfiguration config) : base(config) { }

        private Job NewJobFromReader(SqlDataReader reader)
        {
            return new Job()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                PostDate = reader.GetDateTime(reader.GetOrdinal("PostDate")),
                JobTitle = reader.GetString(reader.GetOrdinal("JobTitle")),
                JobLocation = DbUtils.GetNullableString(reader, "JobLocation"),
                Salary = reader.GetInt32(reader.GetOrdinal("Salary")),
                Rate = reader.GetString(reader.GetOrdinal("Rate")),
                Requirements = reader.GetString(reader.GetOrdinal("Requirements")),
                JobSummary = reader.GetString(reader.GetOrdinal("JobSummary")),
                Type = reader.GetString(reader.GetOrdinal("Type")),
                Keyword1 = DbUtils.GetNullableString(reader, "Keyword1"),
                Keyword2 = DbUtils.GetNullableString(reader, "Keyword2"),
                Keyword3 = DbUtils.GetNullableString(reader, "Keyword3"),
                EmployerId = reader.GetInt32(reader.GetOrdinal("EmployerId")),
                Employer = new Employer()
                {
                    Id = DbUtils.GetNullableInt(reader, "EmployerId"),
                    Name = DbUtils.GetNullableString(reader, "Name"),
                    Industry = DbUtils.GetNullableString(reader, "Industry")
                }
            };
        }

        public List<Job> GetAllJobs()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT j.Id, j.PostDate, j.JobTitle, j.JobLocation, j.Salary, j.Rate, j.Requirements, j.JobSummary,
                              j.Type, j.Keyword1, j.Keyword2, j.Keyword3, j.EmployerId,

                              e.Id, e.Name, e.Industry
                         FROM Jobs j
                              LEFT JOIN Employers e ON j.EmployerId = e.Id";
                    var reader = cmd.ExecuteReader();

                    var jobs = new List<Job>();

                    while (reader.Read())
                    {
                        jobs.Add(NewJobFromReader(reader));
                    }

                    reader.Close();

                    return jobs;
                }
            };
        }

        public List<Job> GetAllJobsByEmployerId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT j.Id, j.PostDate, j.JobTitle, j.JobLocation, j.Salary, j.Rate, j.Requirements, j.JobSummary,
                              j.Type, j.Keyword1, j.Keyword2, j.Keyword3, j.EmployerId,

                              e.Id, e.Name, e.Industry
                         FROM Jobs j
                              LEFT JOIN Employers e ON j.EmployerId = e.Id
                               WHERE j.EmployerId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var jobs = new List<Job>();

                    while (reader.Read())
                    {
                        jobs.Add(NewJobFromReader(reader));
                    }

                    reader.Close();

                    return jobs;
                }
            };
        }

        public Job GetJobById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT j.Id, j.PostDate, j.JobTitle, j.JobLocation, j.Salary, j.Rate, j.Requirements, j.JobSummary,
                              j.Type, j.Keyword1, j.Keyword2, j.Keyword3, j.EmployerId,

                              e.Id, e.Name, e.Industry
                         FROM Jobs j
                              LEFT JOIN Employers e ON j.EmployerId = e.Id
                        WHERE j.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Job job = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        job = NewJobFromReader(reader);
                    }
                    reader.Close();

                    return job;
                }
            }
        }

        public void Add(Job job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Jobs (PostDate, JobTitle, JobLocation, Salary, Rate, Requirements,
                                                          JobSummary, Type, Keyword1, Keyword2, Keyword3, EmployerId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@PostDate, @JobTitle, @JobLocation, @Salary, @Rate, @Requirements,
                                                @JobSummary, @Type, @Keyword1, @Keyword2, @Keyword3, @EmployerId)";
                    DbUtils.AddParameter(cmd, "@PostDate", job.PostDate);
                    DbUtils.AddParameter(cmd, "@JobTitle", job.JobTitle);
                    DbUtils.AddParameter(cmd, "@JobLocation", job.JobLocation);
                    DbUtils.AddParameter(cmd, "@Salary", job.Salary);
                    DbUtils.AddParameter(cmd, "@Rate", job.Rate);
                    DbUtils.AddParameter(cmd, "@Requirements", job.Requirements);
                    DbUtils.AddParameter(cmd, "@JobSummary", job.JobSummary);
                    DbUtils.AddParameter(cmd, "@Type", job.Type);
                    DbUtils.AddParameter(cmd, "@Keyword1", job.Keyword1);
                    DbUtils.AddParameter(cmd, "@Keyword2", job.Keyword2);
                    DbUtils.AddParameter(cmd, "@Keyword3", job.Keyword3);
                    DbUtils.AddParameter(cmd, "@EmployerId", job.EmployerId);

                    job.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Job job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Jobs
                            SET 
                                PostDate = @PostDate,
                                JobTitle = @JobTitle, 
                                JobLocation = @JobLocation, 
                                Salary = @Salary,
                                Rate = @Rate,
                                Requirements = @Requirements,
                                JobSummary = @JobSummary,
                                Type = @Type,
                                Keyword1 = @Keyword1,
                                Keyword2 = @Keyword2,
                                Keyword3 = @Keyword3
                                EmployerId = @EmployerId
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", job.Id);
                    cmd.Parameters.AddWithValue("@JobTitle", job.JobTitle);
                    cmd.Parameters.AddWithValue("@PostDate", job.PostDate);
                    cmd.Parameters.AddWithValue("@JobLocation", job.JobLocation);
                    cmd.Parameters.AddWithValue("@Salary", job.Salary);
                    cmd.Parameters.AddWithValue("@Rate", job.Rate);
                    cmd.Parameters.AddWithValue("@Requirements", job.Requirements);
                    cmd.Parameters.AddWithValue("@JobSummary", job.JobSummary);
                    cmd.Parameters.AddWithValue("@Type", job.Type);
                    cmd.Parameters.AddWithValue("@Keyword1", job.Keyword1);
                    cmd.Parameters.AddWithValue("@Keyword2", job.Keyword2);
                    cmd.Parameters.AddWithValue("@Keyword3", job.Keyword3);
                    cmd.Parameters.AddWithValue("@EmployerId", job.EmployerId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Jobs
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}