using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using JobCannon.Models;
using JobCannon.Utils;

namespace JobCannon.Repositories
{
    public class ChatRepository : BaseRepository, IChatRepository
    {
        public ChatRepository(IConfiguration config) : base(config) { }

        private Chat NewChatFromReader(SqlDataReader reader)
        {
            return new Chat()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                InitiatingUserId = reader.GetInt32(reader.GetOrdinal("InitiatingUserId")),
                ReciprocatingUserId = reader.GetInt32(reader.GetOrdinal("ReciprocatingUserId")),
                MutualInterest = reader.GetString(reader.GetOrdinal("MutualInterest")),
                InitiatingInterested = reader.GetBoolean(reader.GetOrdinal("InitiatingInterested")),
                ReciprocatingInterested = reader.GetBoolean(reader.GetOrdinal("ReciprocatingInterested"))
            };
        }
        

        public List<Chat> GetAllChats()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, InitiatingUserId, ReciprocatingUserId, MutualInterest, InitiatingInterested, ReciprocatingInterested
                         FROM Chats";
                    var reader = cmd.ExecuteReader();

                    var chats = new List<Chat>();

                    while (reader.Read())
                    {
                        chats.Add(NewChatFromReader(reader));
                    }

                    reader.Close();

                    return chats;
                }
            };
        }

        public Chat GetChatById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, InitiatingUserId, ReciprocatingUserId, MutualInterest, InitiatingInterested, ReciprocatingInterested
                         FROM Chats
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Chat chat = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        chat = NewChatFromReader(reader);
                    }
                    reader.Close();

                    return chat;
                }
            }
        }

        public void Add(Chat chat)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Chats (InitiatingUserId, ReciprocatingUserId, MutualInterest, InitiatingInterested, ReciprocatingInterested)
                                        OUTPUT INSERTED.ID
                                        VALUES (@InitiatingUserId, @ReciprocatingUserId, @MutualInterest, @InitiatingInterested, @ReciprocatingInterested)";
                    DbUtils.AddParameter(cmd, "@InitiatingUserId", chat.InitiatingUserId);
                    DbUtils.AddParameter(cmd, "@ReciprocatingUserId", chat.ReciprocatingUserId);
                    DbUtils.AddParameter(cmd, "@MutualInterest", chat.MutualInterest);
                    DbUtils.AddParameter(cmd, "@InitiatingInterested", chat.InitiatingInterested);
                    DbUtils.AddParameter(cmd, "@ReciprocatingInterested", chat.ReciprocatingInterested);
                    chat.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Chat chat)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Chats
                            SET 
                                InitiatingUserId = @InitiatingUserId,
                                ReciprocatingUserId = @ReciprocatingUserId, 
                                MutualInterest = @MutualInterest,
                                InitiatingInterested = @InitiatingInterested, 
                                ReciprocatingInterested = @ReciprocatingInterested
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", chat.Id);
                    cmd.Parameters.AddWithValue("@InitiatingUserId", chat.InitiatingUserId);
                    cmd.Parameters.AddWithValue("@ReciprocatingUserId", chat.ReciprocatingUserId);
                    cmd.Parameters.AddWithValue("@MutualInterest", chat.MutualInterest);
                    cmd.Parameters.AddWithValue("@InitiatingInterested", chat.InitiatingInterested);
                    cmd.Parameters.AddWithValue("@ReciprocatingInterested", chat.ReciprocatingInterested);
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
                            DELETE FROM Chats
                            WHERE Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}