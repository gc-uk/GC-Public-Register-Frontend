USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetAccountData]    Script Date: 30/09/2019 15:13:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get Business
-- =============================================
CREATE PROCEDURE [dbo].[GetAccountData] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_accounts as ac	
	where ac.accountnumber = @query
	
END


GO


