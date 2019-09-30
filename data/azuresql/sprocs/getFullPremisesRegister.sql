USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetFullPremisesRegister]    Script Date: 30/09/2019 15:14:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 27 September 2019
-- Description:	Get full premises register
-- =============================================
CREATE PROCEDURE [dbo].[GetFullPremisesRegister] 

AS
BEGIN
	SET NOCOUNT ON;
select ad.rowid, ad.accountnumber, ac.accountname, ad.premisesactivity, ad.localauthority, ad.addressline1, ad.addressline2, ad.city, ad.postcode 
from [dbo].[Addresses] as ad 
inner join [dbo].[view_PublicRegister_Accounts] as ac 
on ac.accountnumber = ad.accountnumber and ad.addresstype = 'Licensed Premise'
order by ad.addressline1
	
END






GO


