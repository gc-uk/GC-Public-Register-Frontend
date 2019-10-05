USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetFullBusinessRegister]    Script Date: 02/10/2019 19:59:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get full business register
-- =============================================
CREATE PROCEDURE [dbo].[GetFullBusinessRegister] 
	@offset int,
	@fetch int,
	@order varchar(1),
	@filter varchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	
	IF (@filter ='0')
BEGIN
 
	SELECT * from view_publicregister_accounts 
	where AccountType = 'Operator'

   ORDER BY
  case when @order = 'a' THEN accountname END ASC ,
  case when @order = 'z' then accountname end DESC
	OFFSET @offset ROWS FETCH NEXT @fetch ROWS ONLY;

END
ELSE
BEGIN
   
	SELECT * from view_publicregister_accounts as ac
	inner join view_PublicRegister_LicenceActivities as la
	on la.accountnumber = ac.accountnumber
	where ac.AccountType = 'Operator'
	and la.Activity in (@filter)

   ORDER BY
  case when @order = 'a' THEN accountname END ASC ,
  case when @order = 'z' then accountname end DESC
	OFFSET @offset ROWS FETCH NEXT @fetch ROWS ONLY;
END


	
END




GO


