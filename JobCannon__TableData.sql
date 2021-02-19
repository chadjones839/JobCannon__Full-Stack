USE [master]

IF db_id('JobCannon') IS NULL
  CREATE DATABASE [JobCannon]
GO

USE [JobCannon]
GO


DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Candidates];
DROP TABLE IF EXISTS [Employers];
DROP TABLE IF EXISTS [Chats];
DROP TABLE IF EXISTS [Messages];
DROP TABLE IF EXISTS [Jobs];
DROP TABLE IF EXISTS [Resumes];
DROP TABLE IF EXISTS [WorkHistory];
DROP TABLE IF EXISTS [Skills];
DROP TABLE IF EXISTS [Schools];
GO


CREATE TABLE [Candidates] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirstName] varchar(25),
  [LastName] varchar(25),
  [Location] varchar(35),
  [JobTitle] varchar(50)
)

CREATE TABLE [Employers] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] varchar(75),
  [Industry] varchar(50),
  [Location] varchar(50)
)

CREATE TABLE [Users] (
  [Id] int PRIMARY KEY IDENTITY,
  [Email] varchar(100) NOT NULL,
  [FirebaseUserId] varchar(255) NOT NULL,
  [ImageUrl] varchar(MAX),
  [Bio] varchar(MAX),
  [CandidateId] int,
  [EmployerId] int

  CONSTRAINT [FK_Users_Candidates] FOREIGN KEY ([CandidateId]) REFERENCES [Candidates] ([Id]),
  CONSTRAINT [FK_Users_Employers] FOREIGN KEY ([EmployerId]) REFERENCES [Employers] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Chats] (
  [Id] integer PRIMARY KEY IDENTITY,
  [InitiatingUserId] integer NOT NULL,
  [ReciprocatingUserId] integer NOT NULL,
  [MutualInterest] bitorigin 

  CONSTRAINT [FK_Chats_Users_InitiatingUser] FOREIGN KEY ([InitiatingUserId]) REFERENCES [Users] ([Id]),
  CONSTRAINT [FK_Chats_Users_ReciprocatingUser] FOREIGN KEY ([ReciprocatingUserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Messages] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ChatId] integer NOT NULL,
  [UserId] int NOT NULL,
  [Content] varchar(250)

  CONSTRAINT [FK_Messages_Chats] FOREIGN KEY ([ChatId]) REFERENCES [Chats] ([Id]),
  CONSTRAINT [FK_Messages_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Jobs] (
  [Id] integer PRIMARY KEY IDENTITY,
  [EmployerId] int NOT NULL,
  [PostDate] int NOT NULL,
  [JobTitle] varchar(50) NOT NULL,
  [JobLocation] varchar(50) NOT NULL,
  [Salary] integer NOT NULL,
  [Rate] varchar(25) NOT NULL,
  [Requirements] varchar(MAX) NOT NULL,
  [JobSummary] varchar(MAX) NOT NULL,
  [Type] varchar(25),
  [Keyword1] varchar(25),
  [Keyword2] varchar(25),
  [Keyword3] varchar(25)

  CONSTRAINT [FK_Jobs_Users] FOREIGN KEY ([EmployerId]) REFERENCES [Users] ([Id])
)


CREATE TABLE [WorkHistory] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [JobTitle] varchar(50) NOT NULL,
  [Company] varchar(50) NOT NULL,
  [Location] varchar(50) NOT NULL,
  [StartMonth] varchar(10) NOT NULL,
  [EndMonth] varchar(10),
  [StartYear] int NOT NULL,
  [EndYear] int,
  [Current] bit NOT NULL,
  [Description] varchar(MAX)

  CONSTRAINT [FK_WorkHistory_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Skills] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Skill1] varchar(30),
  [Skill2] varchar(30),
  [Skill3] varchar(30),
  [Skill4] varchar(30),
  [Skill5] varchar(30),
  [Skill6] varchar(30),
  [Skill7] varchar(30),
  [Skill8] varchar(30),
  [Skill9] varchar(30),
  [Skill10] varchar(30)

  CONSTRAINT [FK_Skills_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

CREATE TABLE [Schools] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [SchoolName] varchar(50) NOT NULL,
  [Field] varchar(50) NOT NULL,
  [Degree] varchar(50) NOT NULL,
  [StartMonth] varchar(10) NOT NULL,
  [EndMonth] varchar(10),
  [StartYear] int NOT NULL,
  [EndYear] int,
  [Current] bit NOT NULL

  CONSTRAINT [FK_Schools_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
)

GO