USE [publicregisters]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get Premisis
-- =============================================
CREATE PROCEDURE [dbo].[GetPremisisData] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_address as ad	
inner join [dbo].[view_PublicRegister_Accounts] as ac 
on ac.accountnumber = ad.accountnumber and ad.addresstype = 'Licensed Premise'
	where ac.rowid = @query
	
END


GO


