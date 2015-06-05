var basePath = 'user/work/';

exports.index = function (req, res) {
    return res.render(basePath + 'index');
};

exports.add = function (req, res) {
    global.db.Category.isSelected(req.user).then(function (data) {
        return res.json(data);
    });

    /*global.db.Sequelize.Promise.all([
     global.db.Category.findAll(),
     req.user.getSpecialties({attributes: ['id']})
     ]).then(function (result) {
     var categories = result[0], specialties = result[1];

     })*/
};

/**
 * Work Create
 * ====================================================================
 * When a work is created this is added to the current user and set categories and tags
 * @param categories ids of the cotegories
 * @param tags ids of the tags
 * @param work data
 */
exports.create = function (req, res) {
    var promises = [
        global.db.Category.findAll({where: {id: {$in: req.body.categories}}}),
        global.db.Tag.findAll({where: {id: {$in: req.body.tags}}}),
        global.db.Work.create(req.body.work, {user: req.user})
    ];
    global.db.Sequelize.Promise.all(promises).then(function (data) {
        var categories = data[0], tags = data[1], work = data[2];
        var promises = [
            work.setUser(req.user),
            work.setCategories(categories),
            work.setTags(tags)
        ];
        global.db.Sequelize.Promise.all(promises).then(function () {
            if (req.xhr)
                return res.ok({work: work}, 'Obra creada');

            req.flash('successMessage', 'Obra creada');
            return res.redirect('back');
        });
    });
};

exports.edit = function (req, res) {
    return res.render(basePath + 'edit');
};

exports.update = function (req, res) {
    var promises = [
        global.db.Category.findAll({where: {id: {$in: req.body.categories}}}),
        global.db.Tag.findAll({where: {id: {$in: req.body.tags}}})
    ];

    global.db.Sequelize.Promise.all(promises).then(function (data) {
        var categories = data[0], tags = data[1],
            promises = [
                req.work.updateAttributes(req.body),
                req.work.setCategories(categories),
                req.work.setTags(tags)
            ];
        global.db.Sequelize.Promise.all(promises).then(function () {
            if (req.xhr)
                return res.ok({work: req.work}, 'Obra actualizada');

            req.flash('successMessage', 'Obra actualizada');
            return res.redirect('back');
        });
    });
};

exports.delete = function (req, res) {
    req.work.destroy().then(function () {
        if (req.xhr)
            return res.ok({work: req.work}, 'Obra eliminada');

        req.flash('successMessage', 'Obra eliminada');
        return res.redirect('back');
    });
};

exports.like = function (req, res) {
    req.work.like(req.user).then(function (likes) {
        return res.ok({work: req.work, likes: likes}, 'Work liked');
    });
};

exports.unLike = function (req, res) {
    req.work.unLike(req.user).then(function (likes) {
        return res.ok({work: req.work, likes: likes}, 'Work unLiked');
    });
};

exports.featured = function (req, res) {
    req.work.updateAttributes({featured: true}).then(function () {
        return res.ok({work: req.work}, 'Work featured');
    });
};

exports.unFeatured = function (req, res) {
    req.work.updateAttributes({featured: false}).then(function () {
        return res.ok({work: req.work}, 'Work unFeatured');
    });
};

exports.public = function (req, res) {
    req.work.updateAttributes({public: true}).then(function () {
        return res.ok({work: req.work}, 'Work published');
    });
};

exports.private = function (req, res) {
    req.work.updateAttributes({public: false}).then(function () {
        return res.ok({work: req.work}, 'Work unPublished');
    });
};