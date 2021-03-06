USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetLicences]    Script Date: 30/09/2019 15:15:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Get licences
-- =============================================
CREATE PROCEDURE [dbo].[GetLicences] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_licences as ac	
	where ac.accountnumber = @query
	order by [status]
	
END


GO


