USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetFullBusinessRegister]    Script Date: 30/09/2019 15:13:51 ******/
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

AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_accounts
	where AccountType = 'Operator'
	Order by accountname
	
END



GO


