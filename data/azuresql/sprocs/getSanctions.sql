USE [publicregisters]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 1 October 2019
-- Description:	Get sanctions for a business
-- =============================================
CREATE PROCEDURE [dbo].[GetSanctions] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from sanctions
	where accountnumber = @query
	
END



GO


