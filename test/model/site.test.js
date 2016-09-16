const {
  removeAllDocument
} = require('../common')
const {
  Site
} = require('../../model/site')
require('babel-polyfill')

describe('Site', function () {
  const origin = {
    site_meta: {
      title: 'test site',
      panels: ['panel1', 'panel2']
    },
    about: {
      title: 'about me',
      content: 'welcome'
    }
  }
  const site = new Site(origin)

  describe('#getSiteMeta()', function () {
    it('should return site_meta property of site object', function () {
      const result = site.getSiteMeta()
      result.title.should.eql('test site')
      result.panels.should.eql(['panel1', 'panel2'])
    })

    it('should return "" in title property while title is undefined', function () {
      const origin = {
        site_meta: {
          title: undefined,
          panels: ['panel1', 'panel2']
        }
      }
      const site = new Site(origin)
      site.getSiteMeta().title.should.eql('')
    })

    it('should return empty array in panels property while panels is undefined', function () {
      const origin = {
        site_meta: {
          panels: undefined
        }
      }
      const site = new Site(origin)
      site.getSiteMeta().panels.should.eql([])
    })
  })

  describe('#getAbout()', function () {
    it('should return about property of site object', function () {
      site.getAbout().should.eql({
        title: 'about me',
        content: 'welcome'
      })
    })

    it('should return a object with default value if about property is undefined', function () {
      const origin = {
        about: undefined
      }
      const site = new Site(origin)
      site.getAbout().should.eql({
        title: '',
        content: ''
      })
    })
  })

  describe('.set(obj)', function () {
    beforeEach(function (done) {
      removeAllDocument(Site, done)
    })

    it('should set record in database', function (done) {
      Site.set(origin, function () {
        Site.find({}, function (error, docs) {
          (error === null).should.be.true
          docs.length.should.equal(1)
          const siteMeta = docs[0].site_meta
          const about = docs[0].about
          siteMeta.title.should.eql(origin.site_meta.title)
          siteMeta.panels.toObject().should.eql(origin.site_meta.panels)
          about.toObject().should.eql(origin.about)
          done()
        })
      })
    })

    it('should save only one record while called multiple times', function (done) {
      const anotherOrigin = {
        site_meta: {
          title: 'test site 1',
          panels: ['panel1', 'panel2', 'panel3']
        },
        about: {
          title: 'about me 2',
          content: 'welcome'
        }
      }
      Site.set(origin, function () {
        Site.set(anotherOrigin, function () {
          Site.find({}, function (error, docs) {
            (error === null).should.be.true
            docs.length.should.equal(1)
            const siteMeta = docs[0].site_meta
            const about = docs[0].about
            siteMeta.title.should.eql(anotherOrigin.site_meta.title)
            siteMeta.panels.toObject().should.eql(anotherOrigin.site_meta.panels)
            about.toObject().should.eql(anotherOrigin.about)
            done()
          })
        })
      })
    })
  })
})
