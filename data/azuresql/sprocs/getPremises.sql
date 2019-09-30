USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetPremises]    Script Date: 30/09/2019 15:15:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 27 September 2019
-- Description:	Get premises for business
-- =============================================
CREATE PROCEDURE [dbo].[GetPremises] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from addresses
	where AddressType = 'Licensed Premise'
	and accountnumber = @query 
	
END





GO


