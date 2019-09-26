USE [publicregisters]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Business register query for domain names
-- =============================================
CREATE PROCEDURE [dbo].[SearchDomainNames] 
	@query nvarchar(50),
	@strippedquery nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_domainnames 
	where domainname like'%' + @query + '%' 
	or domainname like '%' + @strippedQuery + '%' 
	order by domainname asc
END


GO


