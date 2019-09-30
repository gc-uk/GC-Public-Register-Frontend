USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[SearchPersonalRegister2]    Script Date: 30/09/2019 15:17:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Personal register query
-- =============================================
CREATE PROCEDURE [dbo].[SearchPersonalRegister2] 
	@query nvarchar(50),
	@query2 nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT distinct(ac.accountnumber), ac.accountname, ad.City, ac.IndividualFirstName, ac.IndividualLastName from view_publicregister_accounts as ac	
	left join view_publicregister_addresses as ad
	on ad.accountnumber = ac.accountnumber and ac.accounttype = 'Personal'
	where ac.accounttype = 'Personal' 
	and ac.individualfirstname like '' + @query +'%'	 
	and ac.individuallastname like '' + @query2 +'%'	
	or ac.accountnumber like '%'+ @query +'%'
		order by accountname asc
END








GO


