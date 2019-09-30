USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[SearchTradingNames]    Script Date: 30/09/2019 15:17:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Business register query for trading names
-- =============================================
CREATE PROCEDURE [dbo].[SearchTradingNames] 
	@query nvarchar(50),
	@strippedquery nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_tradingnames 
	where tradingname like'%' + @query + '%' 
	or tradingname like '%' + @strippedQuery + '%' 
	order by tradingname asc
END




GO


