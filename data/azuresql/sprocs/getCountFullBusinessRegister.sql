USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetCountFullBusinessRegister]    Script Date: 03/10/2019 08:43:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get full business register
-- =============================================
CREATE PROCEDURE [dbo].[GetCountFullBusinessRegister] 
	@filter varchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	IF (@filter ='0')
BEGIN
 
	SELECT count(*) as count from view_publicregister_accounts 
	where AccountType = 'Operator'

  

END
ELSE
BEGIN
   
	SELECT count(*) as count from view_publicregister_accounts as ac
	inner join view_PublicRegister_LicenceActivities as la
	on la.accountnumber = ac.accountnumber
	where ac.AccountType = 'Operator'
	and la.Activity in (@filter)

  
END




	
END




GO


