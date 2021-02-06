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
                    Location = DbUtils.GetNullableString(reader, "Location"),
                    JobTitle = DbUtils.GetNullableString(reader, "JobTitle"),
                },
                EmployerId = DbUtils.GetNullableInt(reader, "EmployerId"),
                Employer = new Employer()
                {
                    Id = DbUtils.GetNullableInt(reader, "EmployerId"),
                    Name = DbUtils.GetNullableString(reader, "Name"),
                    Industry = DbUtils.GetNullableString(reader, "Industry"),
                    Location = DbUtils.GetNullableString(reader, "Location"),
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

                              c.Id, c.FirstName, c.LastName, c.Location, c.JobTitle,

                              e.Id, e.Name, e.Industry, e.Location
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

        /* public List<UserProfile> GetAllSalesUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId, u.ImageUrl,

                              ut.Id, ut.[Name] AS UserTypeName
                         FROM UserProfile u
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE u.UserTypeId = 2";
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            };
        }

        public List<UserProfile> GetAllManagerUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId, u.ImageUrl,

                              ut.Id, ut.[Name] AS UserTypeName
                         FROM UserProfile u
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE u.UserTypeId = 1";
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            };
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId, u.ImageUrl,

                              ut.Id, ut.[Name] AS UserTypeName
                         FROM UserProfile u
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE u.FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile user = null;

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

        public UserProfile GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId, u.ImageUrl,

                              ut.Id, ut.[Name] AS UserTypeName
                         FROM UserProfile u
                              LEFT JOIN UserType ut ON u.Id = ut.Id
                        WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile user = null;

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

        public void Add(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, 
                                                          LastName, Email, ImageUrl, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, 
                                                @Email, @ImageUrl, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE UserProfile
                            SET 
                                Email = @email, 
                                FirebaseUserId = @firebaseUserId,
                                FirstName = @firstName, 
                                LastName = @lastName,
		                        UserTypeId = @userTypeId
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", user.Id);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@firebaseUserId", user.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName);
                    cmd.Parameters.AddWithValue("@ImageUrl", user.ImageUrl);
                    cmd.Parameters.AddWithValue("@userTypeId", user.UserTypeId);
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
                            DELETE FROM UserProfile
                            WHERE Id = @id
                        ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }*/
    }
}