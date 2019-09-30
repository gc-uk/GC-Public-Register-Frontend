USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetPremisesData]    Script Date: 30/09/2019 15:15:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get Premisis
-- =============================================
CREATE PROCEDURE [dbo].[GetPremisesData] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from addresses as ad	
inner join [dbo].[view_PublicRegister_Accounts] as ac 
on ac.accountnumber = ad.accountnumber and ad.addresstype = 'Licensed Premise'
	where ad.rowid = @query
	
END



GO


