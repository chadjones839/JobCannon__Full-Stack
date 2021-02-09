using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class EmployerRepository : BaseRepository, IEmployerRepository
    {
        public EmployerRepository(IConfiguration config) : base(config) { }

        private Employer NewEmployerFromReader(SqlDataReader reader)
        {
            return new Employer()
            {
                Id = DbUtils.GetNullableInt(reader, "Id"),
                Name = DbUtils.GetNullableString(reader, "Name"),
                Location = DbUtils.GetNullableString(reader, "Location"),
                Industry = DbUtils.GetNullableString(reader, "Industry")
            };
        }

        public Employer GetEmployerById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, Name, Location, Industry
                         FROM Employers
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Employer employer = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        employer = NewEmployerFromReader(reader);
                    }
                    reader.Close();

                    return employer;
                }
            }
        }

        public void Add(Employer employer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Employers (Name, Location, Industry)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Location, @Industry)";
                    DbUtils.AddParameter(cmd, "@Name", employer.Name);
                    DbUtils.AddParameter(cmd, "@Location", employer.Location);
                    DbUtils.AddParameter(cmd, "@Industry", employer.Industry);

                    employer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Employer employer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Employers
                            SET 
                                Name = @Name,
                                Location = @Location,
                                Industry = @industry
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", employer.Id);
                    cmd.Parameters.AddWithValue("@Name", employer.Name);
                    cmd.Parameters.AddWithValue("@Location", employer.Location);
                    cmd.Parameters.AddWithValue("@Industry", employer.Industry);
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
                            DELETE FROM Employers
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
