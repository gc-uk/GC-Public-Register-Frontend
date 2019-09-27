USE [publicregisters]
GO

/****** Object:  StoredProcedure [dbo].[SearchBusinessRegister]    Script Date: 27/09/2019 12:21:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Andy Williams-Jones
-- Create date: 26 September 2019
-- Description:	Business register query
-- =============================================
CREATE PROCEDURE [dbo].[SearchBusinessRegister] 
	@query nvarchar(50),
	@strippedquery nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT distinct(ac.accountnumber), ac.accountname from view_publicregister_accounts as ac
	left join view_publicregister_domainnames as dn 
	on dn.accountnumber = ac.accountnumber and ac.accounttype = 'Operator'
	left join view_publicregister_tradingnames as tn
	on tn.accountnumber = ac.accountnumber and ac.accounttype = 'Operator'
	where ac.accounttype = 'Operator' and ac.accountname like '%'+ @query +'%' 
	or dn.domainname like '%'+ @query +'%' 
	or tn.tradingname like '%'+ @query +'%' 
    or dn.domainname like '%'+ @strippedquery +'%' 
	or tn.tradingname like '%'+ @strippedquery +'%'
	or ac.accountnumber = @query
		order by accountname asc
END




GO


