using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class SchoolRepository : BaseRepository, ISchoolRepository
    {
        public SchoolRepository(IConfiguration config) : base(config) { }

        private School NewSchoolFromReader(SqlDataReader reader)
        {
            return new School()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                SchoolName = reader.GetString(reader.GetOrdinal("SchoolName")),
                Field = DbUtils.GetNullableString(reader, "Field"),
                Degree = DbUtils.GetNullableString(reader, "Degree"),
                StartMonth = reader.GetString(reader.GetOrdinal("StartMonth")),
                StartYear = reader.GetInt32(reader.GetOrdinal("StartYear")),
                EndMonth = DbUtils.GetNullableString(reader, "EndMonth"),
                EndYear = DbUtils.GetNullableInt(reader, "EndYear"),
                Current = reader.GetBoolean(reader.GetOrdinal("Current"))
            };
        }

        public List<School> GetAllSchool()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, SchoolName, Field, Degree, StartMonth, StartYear, EndMonth, EndYear, [Current]
                         FROM Schools";
                    var reader = cmd.ExecuteReader();

                    var schools = new List<School>();

                    while (reader.Read())
                    {
                        schools.Add(NewSchoolFromReader(reader));
                    }

                    reader.Close();

                    return schools;
                }
            };
        }

        public List<School> GetSchoolsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, SchoolName, Field, Degree, StartMonth, StartYear, EndMonth, EndYear, [Current]
                         FROM Schools
                         WHERE UserId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var schools = new List<School>();

                    while (reader.Read())
                    {
                        schools.Add(NewSchoolFromReader(reader));
                    }

                    reader.Close();

                    return schools;
                }
            };
        }

        public School GetSchoolById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, SchoolName, Field, Degree, StartMonth, StartYear, EndMonth, EndYear, [Current]
                         FROM Schools
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    School school = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        school = NewSchoolFromReader(reader);
                    }
                    reader.Close();

                    return school;
                }
            }
        }

        public void Add(School school)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Schools (SchoolName, UserId, Field, Degree, StartMonth,
                                                                 StartYear, EndMonth, EndYear, [Current])
                                        OUTPUT INSERTED.ID
                                        VALUES (@SchoolName, @UserId, @Field, @Degree, @StartMonth, @StartYear, @EndMonth, @EndYear, @Current)";
                    DbUtils.AddParameter(cmd, "@SchoolName", school.SchoolName);
                    DbUtils.AddParameter(cmd, "@UserId", school.UserId);
                    DbUtils.AddParameter(cmd, "@Field", school.Field);
                    DbUtils.AddParameter(cmd, "@Degree", school.Degree);
                    DbUtils.AddParameter(cmd, "@StartMonth", school.StartMonth);
                    DbUtils.AddParameter(cmd, "@StartYear", school.StartYear);
                    DbUtils.AddParameter(cmd, "@EndMonth", school.EndMonth);
                    DbUtils.AddParameter(cmd, "@EndYear", school.EndYear);
                    DbUtils.AddParameter(cmd, "@Current", school.Current);

                    school.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(School school)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Schools
                            SET 
                                SchoolName = @SchoolName,
                                UserId = @UserId, 
                                Field = @Field, 
                                Degree = @Degree,
                                StartMonth = @StartMonth,
                                StartYear = @StartYear,
                                EndMonth = @EndMonth,
                                EndYear = @EndYear,
                                [Current] = @Current
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", school.Id);
                    cmd.Parameters.AddWithValue("@UserId", school.UserId);
                    cmd.Parameters.AddWithValue("@SchoolName", school.SchoolName);
                    cmd.Parameters.AddWithValue("@Field", school.Field);
                    cmd.Parameters.AddWithValue("@Degree", school.Degree);
                    cmd.Parameters.AddWithValue("@StartMonth", school.StartMonth);
                    cmd.Parameters.AddWithValue("@StartYear", school.StartYear);
                    DbUtils.AddParameter(cmd, "@EndMonth", school.EndMonth);
                    DbUtils.AddParameter(cmd, "@EndYear", school.EndYear);
                    DbUtils.AddParameter(cmd, "@Current", school.Current);
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
                            DELETE FROM Schools
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}