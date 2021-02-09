using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration config) : base(config) { }

        private User NewUserFromReader(SqlDataReader reader)
        {
            return new User()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                Bio = DbUtils.GetNullableString(reader, "Bio"),
                CandidateId = DbUtils.GetNullableInt(reader,"CandidateId"),
                Candidate = new Candidate()
                {
                    Id = DbUtils.GetNullableInt(reader, "CandidateId"),
                    FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                    LastName = DbUtils.GetNullableString(reader, "LastName"),
                    Location = DbUtils.GetNullableString(reader, "CandidateLocation"),
                    JobTitle = DbUtils.GetNullableString(reader, "JobTitle"),
                },
                EmployerId = DbUtils.GetNullableInt(reader, "EmployerId"),
                Employer = new Employer()
                {
                    Id = DbUtils.GetNullableInt(reader, "EmployerId"),
                    Name = DbUtils.GetNullableString(reader, "Name"),
                    Industry = DbUtils.GetNullableString(reader, "Industry"),
                    Location = DbUtils.GetNullableString(reader, "EmployerLocation"),
                }
            };
        }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.Email, u.FirebaseUserId, u.ImageUrl, u.Bio, u.CandidateId, u.EmployerId,

                              c.Id, c.FirstName, c.LastName, c.Location AS CandidateLocation, c.JobTitle,

                              e.Id, e.Name, e.Industry, e.Location AS EmployerLocation
                         FROM Users u
                              LEFT JOIN Candidates c ON u.CandidateId = c.Id
                              LEFT JOIN Employers e ON u.EmployerId = e.Id";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            };
        }

        public List<User> GetAllCandidates()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.Email, u.FirebaseUserId, u.ImageUrl, u.Bio, u.CandidateId, u.EmployerId,

                              c.Id, c.FirstName, c.LastName, c.Location AS CandidateLocation, c.JobTitle,

                              e.Id, e.Name, e.Industry, e.Location AS EmployerLocation
                         FROM Users u
                              LEFT JOIN Candidates c ON u.CandidateId = c.Id
                              LEFT JOIN Employers e ON u.EmployerId = e.Id
                         WHERE u.EmployerId IS NULL";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            };
        }
        
        public List<User> GetAllEmployers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.Email, u.FirebaseUserId, u.ImageUrl, u.Bio, u.CandidateId, u.EmployerId,

                              c.Id, c.FirstName, c.LastName, c.Location AS CandidateLocation, c.JobTitle,

                              e.Id, e.Name, e.Industry, e.Location AS EmployerLocation
                         FROM Users u
                              LEFT JOIN Candidates c ON u.CandidateId = c.Id
                              LEFT JOIN Employers e ON u.EmployerId = e.Id
                         WHERE u.CandidateId IS NULL";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            };
        }
        
        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.Email, u.FirebaseUserId, u.ImageUrl, u.Bio, u.CandidateId, u.EmployerId,

                              c.Id, c.FirstName, c.LastName, c.Location AS CandidateLocation, c.JobTitle,

                              e.Id, e.Name, e.Industry, e.Location AS EmployerLocation
                         FROM Users u
                              LEFT JOIN Candidates c ON u.CandidateId = c.Id
                              LEFT JOIN Employers e ON u.EmployerId = e.Id
                         WHERE u.FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }
        
        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.Email, u.FirebaseUserId, u.ImageUrl, u.Bio, u.CandidateId, u.EmployerId,

                              c.Id, c.FirstName, c.LastName, c.Location AS CandidateLocation, c.JobTitle,

                              e.Id, e.Name, e.Industry, e.Location AS EmployerLocation
                         FROM Users u
                              LEFT JOIN Candidates c ON u.CandidateId = c.Id
                              LEFT JOIN Employers e ON u.EmployerId = e.Id
                        WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (FirebaseUserId, Email, 
                                                          ImageUrl, Bio, CandidateId, EmployerId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Email, @ImageUrl, 
                                                @Bio, @CandidateId, @EmployerId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@CandidateId", user.CandidateId);
                    DbUtils.AddParameter(cmd, "@EmployerId", user.EmployerId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Users
                            SET 
                                FirebaseUserId = @FirebaseUserId,
                                Email = @email, 
                                ImageUrl = @ImageUrl, 
                                Bio = @Bio,
                                CandidateId = @CandidateId,
                                EmployerId = @EmployerId
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", user.Id);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@FirebaseUserId", user.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@ImageUrl", user.ImageUrl);
                    cmd.Parameters.AddWithValue("@Bio", user.Bio);
                    cmd.Parameters.AddWithValue("@CandidateId", user.CandidateId);
                    cmd.Parameters.AddWithValue("@EmployerId", user.EmployerId);
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
                            DELETE FROM Users
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}