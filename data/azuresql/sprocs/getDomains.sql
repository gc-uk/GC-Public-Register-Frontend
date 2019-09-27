USE [publicregisters]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 27 September 2019
-- Description:	Get domains for business
-- =============================================
CREATE PROCEDURE [dbo].[GetDomains] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_domainnames
	where accountnumber = @query
	
END



GO


