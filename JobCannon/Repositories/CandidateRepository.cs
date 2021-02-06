using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class CandidateRepository : BaseRepository, ICandidateRepository
    {
        public CandidateRepository(IConfiguration config) : base(config) { }

        private Candidate NewCandidateFromReader(SqlDataReader reader)
        {
            return new Candidate()
            {
                Id = DbUtils.GetNullableInt(reader, "Id"),
                FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                LastName = DbUtils.GetNullableString(reader, "LastName"),
                Location = DbUtils.GetNullableString(reader, "Location"),
                JobTitle = DbUtils.GetNullableString(reader, "JobTitle"),
            };
        }

        public Candidate GetCandidateById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, FirstName, LastName, Location, JobTitle
                         FROM Candidates
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Candidate candidate = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        candidate = NewCandidateFromReader(reader);
                    }
                    reader.Close();

                    return candidate;
                }
            }
        }

        public void Add(Candidate candidate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Candidates (FirstName, LastName, Location, JobTitle)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Location, @JobTitle)";
                    DbUtils.AddParameter(cmd, "@FirstName", candidate.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", candidate.LastName);
                    DbUtils.AddParameter(cmd, "@Location", candidate.Location);
                    DbUtils.AddParameter(cmd, "@JobTitle", candidate.JobTitle);

                    candidate.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Candidate candidate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Candidates
                            SET 
                                FirstName = @FirstName,
                                LastName = @LastName,
                                Location = @Location,
                                JobTitle = @JobTitle
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", candidate.Id);
                    cmd.Parameters.AddWithValue("@FirstName", candidate.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", candidate.LastName);
                    cmd.Parameters.AddWithValue("@Location", candidate.Location);
                    cmd.Parameters.AddWithValue("@JobTitle", candidate.JobTitle);
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
                            DELETE FROM Candidates
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
