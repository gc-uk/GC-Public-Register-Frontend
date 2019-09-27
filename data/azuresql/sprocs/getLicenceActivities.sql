USE [publicregisters]
GO

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


