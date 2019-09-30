USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[SearchPremisesRegister]    Script Date: 30/09/2019 15:17:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 27 September 2019
-- Description:	Search the premises register
-- =============================================
CREATE PROCEDURE [dbo].[SearchPremisesRegister] 
	@query nvarchar(100),
	@strippedquery nvarchar(100)
AS
BEGIN
	SET NOCOUNT ON;
select ad.rowid, ad.accountnumber, ac.accountname, ad.premisesactivity, ad.localauthority, ad.addressline1, ad.addressline2, ad.city, ad.postcode 
from [dbo].[Addresses] as ad 
inner join [dbo].[view_PublicRegister_Accounts] as ac 
on ac.accountnumber = ad.accountnumber and ad.addresstype = 'Licensed Premise'
where (ad.addressline1) like'%' + @query + '%'
or (ad.addressline2) like'%' + @query + '%'
or (ad.city) like'%' + @query + '%'
or (ad.postcode) like'%' + @query + '%'
or (ac.accountname) like'%' + @query + '%'
order by ad.addressline1
	
END





GO


