USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetHeadOfficeAddressData]    Script Date: 26/09/2019 22:00:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get Business
-- =============================================
CREATE PROCEDURE [dbo].[GetHeadOfficeAddressData] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_addresses as ac	
	where ac.accountnumber = @query
	and AddressType = 'Head Office'
	
END


GO


