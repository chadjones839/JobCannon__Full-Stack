using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration config) : base(config) { }

        private Message NewMessageFromReader(SqlDataReader reader)
        {
            return new Message()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                ChatId = reader.GetInt32(reader.GetOrdinal("ChatId")),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                User = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    CandidateId = DbUtils.GetNullableInt(reader, "CandidateId"),
                    Candidate = new Candidate()
                    {
                        Id = DbUtils.GetNullableInt(reader,"CandidateId"),
                        FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                    },
                    EmployerId = DbUtils.GetNullableInt(reader, "EmployerId"),
                    Employer = new Employer()
                    {
                        Id = DbUtils.GetNullableInt(reader, "EmployerId"),
                        Name = DbUtils.GetNullableString(reader, "Name"),
                    }
                },
                Content = reader.GetString(reader.GetOrdinal("Content"))
            };
        }


        public List<Message> GetAllMessages()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT m.Id, m.ChatId, m.UserId, m.Content,
                              u.Id, u.CandidateId, u.EmployerId,
                              c.Id, c.FirstName,
                              e.Id, e.Name
                         FROM Messages m
                    LEFT JOIN Users u ON m.UserId = u.id
                    LEFT JOIN Candidates c ON u.CandidateId = c.Id
                    LEFT JOIN Employers e ON u.EmployerId = e.Id";
                    var reader = cmd.ExecuteReader();

                    var messages = new List<Message>();

                    while (reader.Read())
                    {
                        messages.Add(NewMessageFromReader(reader));
                    }

                    reader.Close();

                    return messages;
                }
            };
        }

        public List<Message> GetMessagesByChatId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT m.Id, m.ChatId, m.UserId, m.Content,
                              u.Id, u.CandidateId, u.EmployerId,
                              c.Id, c.FirstName,
                              e.Id, e.Name
                         FROM Messages m
                    LEFT JOIN Users u ON m.UserId = u.id
                    LEFT JOIN Candidates c ON u.CandidateId = c.Id
                    LEFT JOIN Employers e ON u.EmployerId = e.Id
                    WHERE m.ChatId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var messages = new List<Message>();

                    while (reader.Read())
                    {
                        messages.Add(NewMessageFromReader(reader));
                    }

                    reader.Close();

                    return messages;
                }
            };
        }

        public Message GetLastMessage(int chatId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT TOP 1 m.Id, m.ChatId, m.UserId, m.Content
                      FROM Messages m
                     WHERE m.ChatId = @Id
                  ORDER BY m.Id DESC";

                    DbUtils.AddParameter(cmd, "@Id", chatId);

                    Message message = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        return new Message()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            ChatId = reader.GetInt32(reader.GetOrdinal("ChatId")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            Content = reader.GetString(reader.GetOrdinal("Content"))
                        };
                    }
                    reader.Close();

                    return message;
                }
            }
        }

        public void Add(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Messages (ChatId, UserId, Content)
                                        OUTPUT INSERTED.ID
                                        VALUES (@ChatId, @UserId, @Content)";
                    DbUtils.AddParameter(cmd, "@ChatId", message.ChatId);
                    DbUtils.AddParameter(cmd, "@UserId", message.UserId);
                    DbUtils.AddParameter(cmd, "@Content", message.Content);
                    message.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Messages
                            SET 
                                ChatId = @ChatId,
                                UserId = @UserId, 
                                Content = @Content
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", message.Id);
                    cmd.Parameters.AddWithValue("@ChatId", message.ChatId);
                    cmd.Parameters.AddWithValue("@UserId", message.UserId);
                    cmd.Parameters.AddWithValue("@Content", message.Content);
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
                            DELETE FROM Messages
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}