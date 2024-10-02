module.exports = class Backup {
  constructor(client) {
    this.client = client;
    this.configs = {
      channels: async (guild, channels) => {
                return new Promise(async res => {

                    channels.map((channel, i) => {
                        guild.channels.create(channel.name, {
                            type: channel.type === 'news' ? 'text' : channel.type,
                            permissionOverwrites: channel.permissions.map(permission => ({
                                id: permission.type === 'role' ? guild.roles.cache.find(c => c.name === permission.id) : permission.id,
                                deny: permission.deny || [],
                                allow: permission.allow || [],
                                position: channel.position,
                                topic: channel.topic,
                                nsfw: channel.nsfw
                            }))
                        }).then(async c => {

                            if (channel.parent) await c.setParent(guild.channels.cache.find(c => c.name == channel.parent && c.type == 'category').id);

                            if (i === channels.length - 1) res(true)
                        })
                    })
                })
            },
            roles: async (guild, roles) => {
                return new Promise(async res => {
                    roles.map((r, i) => {
                        guild.roles.create({
                            data: {
                                name: r.name,
                                color: r.color,
                                permissions: r.permissions,
                                mentionable: r.mentionable,
                                hoist: r.hoist,
                                position: r.position
                            }
                        }).then(role => {
                            if (!r.members) {
                                if (i === roles.length - 1) res(true);

                                else return role
                            }

                            r.members.map(m => {
                                const member = guild.members.cache.get(m);

                                if (member) member.roles.add(role.id).catch(err => err);

                                if (i === roles.length - 1) res(true)

                                else return role
                            })

                        }).catch(err => console.log(err))
                    })
                })
            },
            categories: async (guild, categories) => {
                return new Promise(async res => {
                    categories.map((category, i) => {
                        guild.channels.create(category.name, {
                            type: 'category',
                            permissionOverwrites: category.permissions.map(permission => ({
                                id: permission.type === 'role' ? guild.roles.cache.find(c => c.name === permission.id) : permission.id,
                                deny: permission.deny || [],
                                allow: permission.allow || []
                            })),
                            position: category.position
                        }).then(category => {
                            if (i === categories.length - 1) res(true)
                        })
                    })
                })
            },
            emojis: async (guild, emojis) => {
                return new Promise(res => {
                    emojis.map((emoji, i) => {
                        guild.emojis.create(emoji.name, emoji.url)
                            .then(e => {
                                if (i === emojis.length - 1) res(true)
                            }, (err) => err)
                    })
                })
            },
            members: async (guild, members) => {
                return new Promise(res => {
                    members.map((member, i) => {
                        const guildMember = guild.members.cache.get(member.id);

                        if (!guildMember) return true;

                        guildMember.setNickname(member.nickname)
                            .then(m => {
                                if (i === members.length - 1) res(true)

                            }, (err) => err);
                    })
                })
            },
            bans: async (guild, bans) => {
                return new Promise(res => {
                    bans.map((ban, i) => {
                        guild.members.ban(ban.id, { reason: ban.reason ? ban.reason : null })
                            .then(banned => {
                                if (i === bans.length - 1) res(true)
                            })
                    })
                })
            },
            infoG: async (guild, { name, banner, icon, }) => {
                return new Promise(async res => {
                    await guild.setName(name);
                    await guild.setIcon(icon);
                    await guild.setBanner(banner);

                    return res(true)
                })
            }
    }
  }

  async delete(user, guild) {
    let pick = await this.client.db.ref(`Users/${user.id}/backups`).once('value').then(r => r.val());
    pick.splice(pick.indexOf(pick.find(p => p.id === guild.id)), 1)
    return this.client.db.ref(`Users/${user.id}/backups`).set(pick)
  }
  async create(user, guild) {
    let info = {
      name: guild.name,
      id: guild.id,
      roles: guild.roles.cache.filter(r => !r.managed && r.id !== guild.id).map(role => ({
                color: role.color,
                members: role.members.array().map(m => m.id),
                name: role.name,
                permissions: role.permissions.toArray(),
                position: role.rawPosition,
                mentionable: role.mentionable,
                hoist: role.hoist,
            })).sort((a, b) => a.position - b.position),
      emojis: guild.emojis.cache.map(emojo => ({ name: emojo.name, url: emojo.url })),
      created: Date.now(),
      channels: guild.channels.cache.filter(c => c.type !== 'category').map(channel => {
                return {
                    permissions: channel.permissionOverwrites.array().map(perm => ({ id: perm.type === 'role' ? guild.roles.cache.get(perm.id).name : perm.id, type: perm.type, deny: perm.deny.toArray(), allow: perm.allow.toArray() })),
                    nsfw: channel.nsfw || false,
                    rate: channel.rateLimitPerUser || 0,
                    category: channel.parent ? guild.channels.cache.get(channel.parent.id).name : false,
                    name: channel.name,
                    type: channel.type,
                    position: channel.rawPosition,
                    topic: channel.topic || false
                }
            }).sort((a, b) => a.position - b.position),
          banner: guild.bannerURL() || null,
          icon: guild.iconURL({ dynamic: true }),
          categories: guild.channels.cache.filter(c => c.type === 'category').map(channel => {
                return {
                    permissions: channel.permissionOverwrites.array().map(perm => ({ id: perm.type === 'role' ? guild.roles.cache.get(perm.id).name : perm.id, type: perm.type, deny: perm.deny.toArray(), allow: perm.allow.toArray() })),
                    position: channel.rawPosition,
                    name: channel.name,
                    channels: guild.channels.cache.filter(c => c.parentID === channel.id).map(c => c.name)
                }
            }).sort((a, b) => a.position - b.position),
            bans: await guild.fetchBans().then(b => b.array().map(b => ({ id: b.user.id, reason: b.reason ? b.reason : null })))
    }
    return await this.client.db.ref(`Users/${user.id}/bakcups/${guild.id}`).set(info);
  }

  async create(info, user, guild) {
    return 
  }

  async get(user, id) {
    return this.client.db.ref(`Users/${user.id}/backups/${id}`).once('value').then(r => r.val());
  }

  async start(user, guild, id) {
    const getBackup = await this.client.db.ref(`Users/${user.id}/backups/${id}`).once('value');

    const { icon, banner, name } = getBackup.val();

        const createRoles = await this.configs.roles(guild, backup.val().roles);

        const createCategories = await this.configs.categories(guild, getBackup.val().categories);

        const createChannels = await this.configs.channels(guild, getBackup.val().channels);

        const createName = await this.configs

        const banUsers = await this.configs.bans(guild, getBackup.val().bans || []);

        const createEmojis = await this.configs.emojis(guild, getBackup.val().emojis);

        const loadOthers = await this.configs.infoG(guild, { icon, banner, name })
  }

}