const Klass = {
  /**
   * 替换话题、言论中的比赛，方案标签
   * @constructor
   * @requires
   * @param {Object} _dom 包含比赛，方案标签的 dom
   * @version 2014 beta release
   * @returns {}
   */
  showCardTags: function(_dom) {
    let _tags = _dom.find('a[data-type="tag"],span[data-type="tag"]'),
      l = _tags.length;

    if (l > 0) {
      // 暂时存在这里
      if (!Klass._showCardTagsList) {
        Klass._showCardTagsList = [];

        // 代码放在 raceProjectCard.scss
        var _head = $('head');

        if (_head.find('style[data-role="raceProjectCard"]').length === 0) {
          _head.append(
            '<style data-role="raceProjectCard">.table-project-simple{margin:3px 0}.table-project-simple th{background-color:#EFF8FF;font-weight:normal;font-size:12px}.table-project-simple td{height:auto;padding:5px 0;font-size:12px}.i-lot-type{display:block;width:36px;height:36px;margin:0 auto;background:url(/img/t/i-lot-type.png) no-repeat}.race-simple{width:333px;margin:3px 0;border:1px solid #e0e0e0;background-color:#fff}.race-simple h4{padding-left:14px;border-bottom:1px solid #e0e0e0;line-height:30px;font-size:12px;font-weight:normal;color:#4e9b19}.race-simple .team{float:left;width:136px;line-height:68px;color:#333;}.race-simple .team-home{text-align:right}.race-simple img{width:40px;height:auto;margin:0 3px}.race-simple .vs{float:left;width:60px;line-height:68px;text-align:center;font-weight:bold;color:#333;}.race-simple-jclq h4{color:#a47314;}</style>'
          );
        }
      }

      // 复制到这里
      for (var i = 0; i < l; i++) {
        Klass._showCardTagsList.push(_tags.eq(i));

        // 去除以前的
        _tags[i] = null;
      }

      // 去除以前的
      _tags.length = 0;
      _tags = null;
    }

    // 如果有，并且当前没有
    if (!Klass.isLoadIngCardTagInfo && Klass._showCardTagsList && Klass._showCardTagsList.length > 0) {
      Klass.showCardTag(Klass._showCardTagsList[0]);
    }
  },

  // 显示单个
  showCardTag: function(_dom) {
    let _url,
      _tagType = _dom.attr('data-tag'),
      isJcRace = true;
    let raceType = _dom.attr('race_type');

    switch (_tagType) {
      // 如果是方案
      case 'project':
        _url = '/tile/service/subject:projectSimpleCard.tile?purchaseNo=' + _dom.attr('data-id');
        break;

      case 'race':
        // 如果是竞彩足球
        if (raceType === 'JCZQ') {
          _url = '/tile/service/subject:jczq/jczqDataCard.tile?bizId=';
          _url += _dom.attr('biz_id');
        } else if (raceType === 'JCLQ') {
          _url = '/tile/service/subject:jclq/jclqDataCard.tile?bizId=';
          _url += _dom.attr('biz_id');
        } else {
          isJcRace = false;
          _url = '/weibo/betArticleRaceDataCard.json?raceId=' + _dom.attr('race_id') + '&raceType=' + raceType;
        }

        break;

      default:
        break;
    }

    Klass.isLoadIngCardTagInfo = true;

    if (isJcRace) {
      $.getJSON(CONFIG.weiboPath + _url + '&_jsonCallback=?', Klass.onGetCardTagData);
    } else {
      $.getJSON(CONFIG.frontPath + _url, function(data) {
        Klass.onGetBetArticleRaceDataCardData(data, raceType);
      });
    }
  },

  onGetBetArticleRaceDataCardData: function(data, raceType) {
    if (Klass._showCardTagsList.length > 0) {
      // 去除一个
      let _dom = Klass._showCardTagsList.shift();

      if (data['data']) {
        let html = '';
        let raceData = data['data'];
        if (raceType === 'FOOTBALL') {
          html += Klass.getBetArticleFootballRaceHtml(raceData);
        } else {
          html += Klass.getBetArticleBasketballRaceHtml(raceData);
        }
        _dom.replaceWith(html);
      }
    }

    // 如果还有
    if (Klass._showCardTagsList.length > 0) {
      Klass.showCardTag(Klass._showCardTagsList[0]);
    } else {
      Klass.isLoadIngCardTagInfo = false;
    }
  },

  getBetArticleBasketballRaceHtml: function(data) {
    let guestTeamName = data['guestTeamName'].substring(0, 5);
    let homeTeamName = data['homeTeamName'].substring(0, 5);
    let raceStatus = data['raceStatus']['name'];
    let fullGuestScore = data['fullGuestScore'];
    let fullHomeScore = data['fullHomeScore'];
    // 总分
    let sumScore = fullGuestScore + fullHomeScore;
    // 分差
    let gapScore = fullHomeScore - fullGuestScore;
    let raceScoreHtml = '';

    if (raceStatus === 'FINISH') {
      raceScoreHtml +=
        '<p class="race-score-jclq">' +
        fullGuestScore +
        ':' +
        fullHomeScore +
        '</p><p class="totleScore">总分' +
        sumScore +
        ' 分差' +
        gapScore +
        '</p>';
    } else {
      raceScoreHtml += 'VS';
    }

    let html =
      '<div class="article-race">' +
      '<dl class="race-info clearfix" >' +
      '<dt class="race-info-item">' +
      data['matchName'] +
      (data['gmtStart'] ? '<br><time>' + data['gmtStart'].substring(5, 16) + '</time>' : '') +
      '</dt>' +
      '<dd class="race-info-item team-info">' +
      '<span class="race-team-name host-team-name">' +
      guestTeamName +
      '</span>' +
      '<img class="race-team-logo" src="' +
      CONFIG['btwebPath'] +
      '/team/logo/' +
      data['innerGuestTeamId'] +
      '.resource?type=g" alt="' +
      guestTeamName +
      '">' +
      '<span class="team-sign guest-team-sign">客</span>' +
      '</dd>' +
      '<dd class="race-info-item race-score">' +
      raceScoreHtml +
      '</dd>' +
      '<dd class="race-info-item team-info">' +
      '<span class="team-sign home-team-sign">主</span>' +
      '<img class="race-team-logo" src="' +
      CONFIG['btwebPath'] +
      '/team/logo/' +
      data['innerHomeTeamId'] +
      '.resource?type=h" alt="' +
      homeTeamName +
      '">' +
      '<span class="race-team-name guest-team-name">' +
      homeTeamName +
      '</span>' +
      '</dd>' +
      '</dl></div>';

    return html;
  },

  getBetArticleFootballRaceHtml: function(data) {
    let guestTeamName = data['guestTeamName'].substring(0, 5);
    let homeTeamName = data['homeTeamName'].substring(0, 5);
    let raceStatus = data['raceStatus']['name'];
    let fullGuestScore = data['fullGuestScore'];
    let fullHomeScore = data['fullHomeScore'];
    let raceScoreHtml = '';

    if (raceStatus === 'FINISH') {
      raceScoreHtml += fullHomeScore + ':' + fullGuestScore;
    } else {
      raceScoreHtml += 'VS';
    }

    let html =
      '<div class="article-race">' +
      '<dl class="race-info clearfix" >' +
      '<dt class="race-info-item">' +
      data['matchName'] +
      (data['gmtStart'] ? '<br><time>' + data['gmtStart'].substring(5, 16) + '</time>' : '') +
      '</dt>' +
      '<dd class="race-info-item team-info">' +
      '<span class="race-team-name host-team-name">' +
      homeTeamName +
      '</span>' +
      '<img class="race-team-logo" src="' +
      CONFIG['ftwebPath'] +
      '/team/logo/' +
      data['innerHomeTeamId'] +
      '.resource?type=h" alt="' +
      homeTeamName +
      '">' +
      '</dd>' +
      '<dd class="race-info-item race-score">' +
      raceScoreHtml +
      '</dd>' +
      '<dd class="race-info-item team-info">' +
      '<img class="race-team-logo" src="' +
      CONFIG['ftwebPath'] +
      '/team/logo/' +
      data['innerGuestTeamId'] +
      '.resource?type=g" alt="' +
      guestTeamName +
      '">' +
      '<span class="race-team-name guest-team-name">' +
      guestTeamName +
      '</span>' +
      '</dd>' +
      '</dl></div>';

    return html;
  },

  onGetCardTagData: function(data) {
    if (Klass._showCardTagsList.length > 0) {
      // 去除一个
      let _dom = Klass._showCardTagsList.shift();

      if (data['html']) {
        _dom.replaceWith(data['html']);
      }
    }

    // 如果还有
    if (Klass._showCardTagsList.length > 0) {
      Klass.showCardTag(Klass._showCardTagsList[0]);
    } else {
      Klass.isLoadIngCardTagInfo = false;
    }
  }
};
export default Klass;
