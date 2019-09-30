USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetTradingNames]    Script Date: 30/09/2019 15:15:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 27 September 2019
-- Description:	Get domains for business
-- =============================================
CREATE PROCEDURE [dbo].[GetTradingNames] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_tradingnames
	where accountnumber = @query
	
END



GO


