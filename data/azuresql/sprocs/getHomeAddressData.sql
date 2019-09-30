USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetHomeAddressData]    Script Date: 30/09/2019 15:14:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get Business
-- =============================================
CREATE PROCEDURE [dbo].[GetHomeAddressData] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_addresses as ac	
	where ac.accountnumber = @query
	and AddressType = 'Home'
	
END



GO


