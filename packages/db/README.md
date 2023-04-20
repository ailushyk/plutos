# Plutos DB

## Setup

install planet scale cli and mysql client
([doc](https://planetscale.com/docs/concepts/planetscale-environment-setup)):

```bash
brew install planetscale/tap/pscale
brew install mysql-client
```

## Usage

### Login to PlanetScale

```bash
pscale auth login
```

### Connect to the database locally

```bash
pscale connect plutos [branch] --port 3309
```
