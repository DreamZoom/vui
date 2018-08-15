Bmob.initialize('e18ad5a06c30c828af156409072718a5', '63460439ab03b8160cea2d4a9150e5f7');

export default {
	getUserInfo() {
		return {
			id: 1,
			username: 'wxllzf',
			nickname: '沧海月生'
		};
	},
	bto(b) {
		var { id, createdAt, updatedAt } = b;
		return { ...b.attributes, id, createdAt, updatedAt };
	},
	btos(l) {
		return l.map((b) => {
			return this.bto(b);
		});
	},
	otb(o, d) {
		var Document = Bmob.Object.extend(d);
		var document = new Document();
		for (var p in o) {
			document.set(p, o[p]);
		}

		return document;
	},
	getH5List(userid) {
		return new Promise((resolve, reject) => {
			var Document = Bmob.Object.extend('Document');
			var query = new Bmob.Query(Document);
			query.equalTo('userid', userid);
			// 查询所有数据
			query.find().then((results)=>{
                resolve(this.btos(results)) 
            },function(d,error){
                reject(error);
            });
		});
    },
    deleteH5(id){
        return new Promise((resolve, reject) => {
			var Document = Bmob.Object.extend('Document');
			var query = new Bmob.Query(Document);
			query.get(id).then((result)=>{
                result.destroy().then((result)=>{
                    resolve(this.bto(result)) 
                },(d,err)=>{
                    reject(error);
                });
            },function(d,error){
                reject(error);
            });
		});
    },
    getH5(id){
        return new Promise((resolve, reject) => {
			var Document = Bmob.Object.extend('Document');
			var query = new Bmob.Query(Document);
			query.get(id).then((result)=>{
                resolve(this.bto(result)) 
            },function(d,error){
                reject(error);
            });
		});
    },
	saveH5(o) {
		var context = this;
		return new Promise(
			/* executor */
			function(resolve, reject) {
				var document = context.otb(o, 'Document');
				document.save(null, {
					success: function(d) {
						resolve(d);
					},
					error: function(d, error) {
						reject(error);
					}
				});
			}
		);
	}
};
