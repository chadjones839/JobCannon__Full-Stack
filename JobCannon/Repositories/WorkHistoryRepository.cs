using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class WorkHistoryRepository : BaseRepository, IWorkHistoryRepository
    {
        public WorkHistoryRepository(IConfiguration config) : base(config) { }

        private WorkHistory NewWorkHistoryFromReader(SqlDataReader reader)
        {
            return new WorkHistory()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                JobTitle = reader.GetString(reader.GetOrdinal("JobTitle")),
                Company = DbUtils.GetNullableString(reader, "Company"),
                Location = DbUtils.GetNullableString(reader, "Location"),
                StartMonth = reader.GetString(reader.GetOrdinal("StartMonth")),
                StartYear = reader.GetInt32(reader.GetOrdinal("StartYear")),
                EndMonth = DbUtils.GetNullableString(reader, "EndMonth"),
                EndYear = DbUtils.GetNullableInt(reader, "EndYear"),
                Current = reader.GetBoolean(reader.GetOrdinal("Current")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }

        public List<WorkHistory> GetAllWorkHistory()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, JobTitle, Company, Location, StartMonth, StartYear, EndMonth, EndYear, [Current], Description
                         FROM WorkHistory";
                    var reader = cmd.ExecuteReader();

                    var workHistory = new List<WorkHistory>();

                    while (reader.Read())
                    {
                        workHistory.Add(NewWorkHistoryFromReader(reader));
                    }

                    reader.Close();

                    return workHistory;
                }
            };
        }

        public List<WorkHistory> GetAllWorkHistoryByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, JobTitle, Company, Location, StartMonth, StartYear, EndMonth, EndYear, [Current], Description
                         FROM WorkHistory
                         WHERE UserId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var workHistory = new List<WorkHistory>();

                    while (reader.Read())
                    {
                        workHistory.Add(NewWorkHistoryFromReader(reader));
                    }

                    reader.Close();

                    return workHistory;
                }
            };
        }

        public WorkHistory GetWorkHistoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, JobTitle, Company, Location, StartMonth, StartYear, EndMonth, EndYear, [Current], Description
                         FROM WorkHistory
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    WorkHistory workHistory = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        workHistory = NewWorkHistoryFromReader(reader);
                    }
                    reader.Close();

                    return workHistory;
                }
            }
        }

        public void Add(WorkHistory workHistory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO WorkHistory (JobTitle, UserId, Company, Location, StartMonth,
                                                                 StartYear, EndMonth, EndYear, [Current], Description)
                                        OUTPUT INSERTED.ID
                                        VALUES (@JobTitle, @UserId, @Company, @Location, @StartMonth, @StartYear, @EndMonth, @EndYear, @Current, @Description)";
                    DbUtils.AddParameter(cmd, "@JobTitle", workHistory.JobTitle);
                    DbUtils.AddParameter(cmd, "@UserId", workHistory.UserId);
                    DbUtils.AddParameter(cmd, "@Company", workHistory.Company);
                    DbUtils.AddParameter(cmd, "@Location", workHistory.Location);
                    DbUtils.AddParameter(cmd, "@StartMonth", workHistory.StartMonth);
                    DbUtils.AddParameter(cmd, "@StartYear", workHistory.StartYear);
                    DbUtils.AddParameter(cmd, "@EndMonth", workHistory.EndMonth);
                    DbUtils.AddParameter(cmd, "@EndYear", workHistory.EndYear);
                    DbUtils.AddParameter(cmd, "@Current", workHistory.Current);
                    DbUtils.AddParameter(cmd, "@Description", workHistory.Description);

                    workHistory.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(WorkHistory workHistory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE WorkHistory
                            SET 
                                JobTitle = @JobTitle,
                                UserId = @UserId, 
                                Company = @Company, 
                                Location = @Location,
                                StartMonth = @StartMonth,
                                StartYear = @StartYear,
                                EndMonth = @EndMonth,
                                EndYear = @EndYear,
                                [Current] = @Current,
                                Description = @Description
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", workHistory.Id);
                    cmd.Parameters.AddWithValue("@UserId", workHistory.UserId);
                    cmd.Parameters.AddWithValue("@JobTitle", workHistory.JobTitle);
                    cmd.Parameters.AddWithValue("@Company", workHistory.Company);
                    cmd.Parameters.AddWithValue("@Location", workHistory.Location);
                    cmd.Parameters.AddWithValue("@StartMonth", workHistory.StartMonth);
                    cmd.Parameters.AddWithValue("@StartYear", workHistory.StartYear);
                    DbUtils.AddParameter(cmd, "@EndMonth", workHistory.EndMonth);
                    DbUtils.AddParameter(cmd, "@EndYear", workHistory.EndYear);
                    DbUtils.AddParameter(cmd, "@Current", workHistory.Current);
                    DbUtils.AddParameter(cmd, "@Description", workHistory.Description);
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
                            DELETE FROM WorkHistory
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}