USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[GetLicenceActivities]    Script Date: 30/09/2019 15:14:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 27 September 2019
-- Description:	Get licence activities by business
-- =============================================
CREATE PROCEDURE [dbo].[GetLicenceActivities] 
	@query int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from view_publicregister_licenceActivities
	where accountnumber = @query
	order by start desc
	
END




GO


