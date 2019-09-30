USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[SearchPersonalRegister]    Script Date: 30/09/2019 15:16:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Personal register query
-- =============================================
CREATE PROCEDURE [dbo].[SearchPersonalRegister] 
	@query nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT distinct(ac.accountnumber), ac.accountname, ad.City, ac.IndividualFirstName, ac.IndividualLastName, ac.accounttype from view_publicregister_accounts as ac	
	left join view_publicregister_addresses as ad
	on ad.accountnumber = ac.accountnumber and ac.accounttype = 'Personal'
	where ac.accounttype = 'Personal' 
	and ac.individualfirstname like '' + @query +'%'	 
	or ac.individuallastname like '' + @query +'%'	
	or ac.accountnumber like '%'+ @query +'%'
		order by accountname asc
END








GO


